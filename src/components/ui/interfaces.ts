export type AccessLog = {
  accessId: number
  createdAt: string
  entryId: number
  entryName: string
  userId: number
}

export type LogsBoxProps = {
  id: number
}

export type Member = {
  email: string
  external_member_id: string
  full_name: string
  id: number
  member_type_name: string
  token: string
  national_id: string
  accessed: boolean
}

export type Entry = {
  id: number
  name: string
  external_entry_id: string
}
