import { useUserContext } from '@/contexts/user-context'

export function useMockUser() {
  const { user } = useUserContext()
  return user
}
