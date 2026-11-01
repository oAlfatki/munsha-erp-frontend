/** Mutation effects follow shared ERP resources, including cross-feature ledger and stock effects. */
export function affectedOwners(type: string): string[] | null {
  if (
    [
      'periodCreate',
      'periodSwitch',
      'periodTransfer',
      'periodActivate',
      'periodReset',
      'organization',
      'branch',
      'importMasters',
      'setupComplete',
    ].includes(type)
  )
    return null;
  if (['invoice', 'deleteDraft', 'return', 'partialReturn'].includes(type))
    return [
      'dashboard',
      'sales',
      'purchases',
      'inventory',
      'accounting',
      'customers',
      'suppliers',
      'users',
    ];
  if (
    ['product', 'warehouse', 'transfer', 'stockDocument', 'deleteStockDraft', 'priceList'].includes(
      type,
    )
  )
    return ['dashboard', 'inventory', 'accounting', 'users'];
  if (type === 'party') return ['customers', 'suppliers', 'users'];
  if (['employee', 'employeeDelete'].includes(type)) return ['employees', 'accounting', 'users'];
  if (['expense', 'expenseSave', 'expensePayment', 'expenseConsume'].includes(type))
    return ['expenses', 'accounting', 'users'];
  if (
    [
      'backupSettings',
      'branding',
      'generalSettings',
      'preferences',
      'systemSettings',
      'screenDraft',
    ].includes(type)
  )
    return ['settings', 'dashboard', 'users'];
  if (type === 'currency') return ['accounting', 'users'];
  if (type === 'salesTarget') return ['sales', 'users'];
  // Generic accounting operations may change payroll, assets, stock or master records.
  return null;
}
