import type { permissionCatalogSchema } from '@/features/users/validations/permission-catalog-schema';
import type { z } from 'zod';

export type PermissionCatalog = z.output<typeof permissionCatalogSchema>;
