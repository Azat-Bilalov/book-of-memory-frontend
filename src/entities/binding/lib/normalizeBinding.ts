import { BindingDto } from "../api/types";
import { Binding } from "../model/types";

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
  };
};
