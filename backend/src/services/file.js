import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import AppError from '../errors/AppError.js'
import { ERROR_CODES } from '../constants/errorCodes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class FileService {
  constructor() {
    this.uploadDir = path.join(__dirname, '..', 'uploads', 'avatars')
    this.maxFileSize = 5 * 1024 * 1024 
    this.allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif']
    this.initUploadDir()
  }

  async initUploadDir() {
    try {
      await fs.access(this.uploadDir)
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true })
    }
  }

  validateFile(file) {
    if (!file) {
      throw new AppError(ERROR_CODES.FILE_NOT_PROVIDED, 400)
    }

    if (file.size > this.maxFileSize) {
      throw new AppError(ERROR_CODES.FILE_TOO_LARGE, 400)
    }

    if (!this.allowedMimeTypes.includes(file.mimetype))  {
      throw new AppError(ERROR_CODES.INVALID_FILE_TYPE, 400)
    }
  }

  generateFileName(originalName) {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15) 
    const ext = path.extname(originalName) 
    return `${timestamp}-${randomString}${ext}` 
  }

  async uploadAvatar(file) {
    this.validateFile(file)

    const fileName = this.generateFileName(file.name)
    const filePath = path.join(this.uploadDir, fileName)

    await file.mv(filePath)

    return `/uploads/avatars/${fileName}`
  }

  async deleteAvatar(avatarPath) {
    if (!avatarPath) {
      return
    }

    try {
      const fileName = path.basename(avatarPath)
      const filePath = path.join(this.uploadDir, fileName)

      await fs.unlink(filePath)
    } catch (error) {
      console.error(error)
    }
  }
}

export default new FileService()