
import { 
  getImageForPost, 
  getPlaceholderImage, 
  getCategoryIcon 
} from '../../utils/image-utils'

describe('Image Utils', () => {
  describe('getImageForPost', () => {
    it('returns category-specific image for cybersecurity post', () => {
      const post = {
        data: {
          category: 'cybersecurity',
          title: 'Test Security Post'
        }
      }
      
      const result = getImageForPost(post)
      expect(result).toContain('cybersecurity')
      expect(result).toContain('.svg')
    })

    it('returns placeholder for post without category', () => {
      const post = {
        data: {
          title: 'Test Post'
        }
      }
      
      const result = getImageForPost(post)
      expect(result).toBe('/images/placeholder-security.svg')
    })
  })

  describe('getPlaceholderImage', () => {
    it('returns security placeholder image', () => {
      const result = getPlaceholderImage()
      expect(result).toBe('/images/placeholder-security.svg')
    })
  })

  describe('getCategoryIcon', () => {
    it('returns correct icon for known categories', () => {
      expect(getCategoryIcon('antivirus')).toBe('/images/antivirus-protection.svg')
      expect(getCategoryIcon('privacy')).toBe('/images/privacy-security.svg')
      expect(getCategoryIcon('scam-detection')).toBe('/images/scam-detection.svg')
    })

    it('returns default icon for unknown categories', () => {
      const result = getCategoryIcon('unknown-category')
      expect(result).toBe('/images/cybersecurity-default.svg')
    })
  })
})
