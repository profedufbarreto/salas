import { CONTENT_TYPES } from '../../utils/constants'

const ContentCard = ({ content, isActive = false }) => {
  if (!content) return null

  const { title, description, imageUrl, type } = content

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center px-8 transition-opacity ${
      isActive ? 'opacity-100' : 'opacity-50'
    }`}>
      {(type === CONTENT_TYPES.IMAGE || type === CONTENT_TYPES.MIXED) && imageUrl && (
        <div className="mb-8 w-full max-w-2xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="text-center max-w-3xl">
        <h1 className={`text-display-lg font-bold text-white mb-6 ${
          type === CONTENT_TYPES.IMAGE ? 'text-4xl' : 'text-display-xl'
        }`}>
          {title}
        </h1>

        {(type === CONTENT_TYPES.TEXT || type === CONTENT_TYPES.MIXED) && (
          <p className="text-display-md text-gray-300 leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default ContentCard