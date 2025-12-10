import { IUser } from "../auth.model";

export function mapUserToDto(user: IUser | any) {
  const id = (user as any)._id?.toString?.() || (user as any).id;
  return {
    id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile_image_url: user.profile_image_url ?? null,
  };
}
