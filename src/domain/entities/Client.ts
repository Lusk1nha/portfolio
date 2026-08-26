export interface Client {
  readonly id: string
  readonly name: string
  readonly project: { pt: string; en: string }
}
