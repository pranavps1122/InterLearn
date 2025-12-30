import { IUser } from "../types/auth.interface";

export function mapUserToDto(user: IUser | any) {
  const id = (user as any)._id?.toString?.() || (user as any).id;
  return {
    id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile_image_url: user.profile_image_url ?? null,
    is_active:user.is_active
  };
}
