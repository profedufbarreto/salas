import { 
  getAllDocuments, 
  getDocument, 
  createDocument, 
  updateDocument, 
  deleteDocument,
  onDocumentsChange
} from './firebaseService'

const COLLECTION_NAME = 'displayContent'

export const getAllContent = async () => {
  return getAllDocuments(COLLECTION_NAME)
}

export const getContent = async (contentId) => {
  return getDocument(COLLECTION_NAME, contentId)
}

export const createContent = async (contentData) => {
  return createDocument(COLLECTION_NAME, {
    title: contentData.title,
    description: contentData.description,
    type: contentData.type,
    imageUrl: contentData.imageUrl || null,
    isActive: contentData.isActive || true,
    displayOrder: contentData.displayOrder || 0,
    duration: contentData.duration || 10,
    category: contentData.category || 'general'
  })
}

export const updateContent = async (contentId, contentData) => {
  return updateDocument(COLLECTION_NAME, contentId, {
    title: contentData.title,
    description: contentData.description,
    type: contentData.type,
    imageUrl: contentData.imageUrl,
    isActive: contentData.isActive,
    displayOrder: contentData.displayOrder,
    duration: contentData.duration,
    category: contentData.category
  })
}

export const deleteContent = async (contentId) => {
  return deleteDocument(COLLECTION_NAME, contentId)
}

export const watchContent = (callback) => {
  return onDocumentsChange(COLLECTION_NAME, callback)
}

export const getActiveContent = async () => {
  const allContent = await getAllContent()
  return allContent
    .filter(item => item.isActive)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
}