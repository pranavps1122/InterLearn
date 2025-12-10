export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findOne(filter: Partial<Record<keyof T, any>>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  update(id: string, update: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  find(filter?: Partial<Record<keyof T, any>>, options?: any): Promise<T[]>;
}
