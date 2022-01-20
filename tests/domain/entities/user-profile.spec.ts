import { UserProfile } from '@/domain/entities/user-profile'

describe('FacebookAccount', () => {
  let id: string
  let pictureUrl: string
  let name: string
  let sut: UserProfile

  beforeEach(() => {
    id = 'any_id'
    pictureUrl = 'any_url'
    name = 'any one name'
    sut = new UserProfile(id)
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl, name })

    expect(sut).toEqual({
      id,
      pictureUrl,
      initials: undefined
    })
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl })

    expect(sut).toEqual({
      id,
      pictureUrl,
      initials: undefined
    })
  })

  it('should create with initials with first letter of first and last names', () => {
    sut.setPicture({ name })

    expect(sut).toEqual({
      id,
      pictureUrl: undefined,
      initials: 'AN'
    })
  })

  it('should create with initials with first letter', () => {
    sut.setPicture({ name: 'a' })

    expect(sut).toEqual({
      id,
      pictureUrl: undefined,
      initials: 'A'
    })
  })

  it('should create with empty initials when name and pictureUrl are not provided', () => {
    sut.setPicture({ })

    expect(sut).toEqual({
      id,
      pictureUrl: undefined,
      initials: undefined
    })
  })
})
