import { normalizeDocument } from "@/entities/document/lib/normalizeDocument";
import {
  BindingDto,
  ModeratorFromBindingDto,
  UserFromBindingDto,
} from "../api/types";
import { Binding, ModeratorFromBinding, UserFromBinding } from "../model/types";
import { normalizeVeteran } from "@/entities/veteran/lib/normalizeVeteran";

const normalizeUser = (user: UserFromBindingDto): UserFromBinding => {
  return {
    id: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  };
};

const normalizeModerator = (
  user: ModeratorFromBindingDto
): ModeratorFromBinding => {
  return {
    id: user.moderator_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  };
};

export const normalizeBinding = (binding: BindingDto): Binding => {
  return {
    id: binding.binding_id,
    status: binding.status,
    createdAt: binding.created_at,
    formattedAt: binding.formatted_at,
    endedAt: binding.ended_at,
    userId: binding.user_id,
    moderatorId: binding.moderator_id,
    veteranId: binding.veteran_id,
    documents: binding.documents?.map((document) =>
      normalizeDocument(document)
    ),
    veteran: binding.veteran ? normalizeVeteran(binding.veteran) : undefined,
    user: normalizeUser(binding.user),
    moderator: normalizeModerator(binding.moderator),
  };
};
