import { IUser } from "@/modules/auth/types/auth.interface";

export interface IUserAdminService {

  getAllUsers(): Promise<IUser[]>;

//   getUserById(userId: string): Promise<IUser | null>;

  blockUser(userId: string): Promise<boolean>;

  unblockUser(userId: string): Promise<boolean>;

  deleteUser(userId: string): Promise<boolean>;
}
