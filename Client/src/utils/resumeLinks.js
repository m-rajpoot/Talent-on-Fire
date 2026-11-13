// Turns any resume link (Google Drive, Cloudinary or a local /public file)
// into the 3 URLs the Resume Samples page needs.
//
//  previewUrl  -> shown inside the preview window (iframe)
//  openUrl     -> opened in a new tab
//  downloadUrl -> direct download (null when not possible, e.g. a Drive folder)
//  thumbnailUrl-> image of page 1 for the card (null when not available)

const getDriveFileId = (url) => {
    const byPath = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/)
    if (byPath) return byPath[1]
    const byQuery = url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([^&#]+)/)
    if (byQuery) return byQuery[1]
    return null
}

const getDriveFolderId = (url) => {
    const match = url.match(/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([^/?#]+)/)
    return match ? match[1] : null
}

export const getResumeLinks = (rawUrl = '') => {
    const url = rawUrl.trim()

    // Google Drive single file (share link: https://drive.google.com/file/d/<ID>/view?usp=sharing)
    const fileId = getDriveFileId(url)
    if (fileId) {
        return {
            source: 'Google Drive',
            previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
            openUrl: `https://drive.google.com/file/d/${fileId}/view`,
            downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
            thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`,
        }
    }

    // Google Drive folder (https://drive.google.com/drive/folders/<ID>)
    const folderId = getDriveFolderId(url)
    if (folderId) {
        return {
            source: 'Google Drive',
            previewUrl: `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`,
            openUrl: url,
            downloadUrl: null,
            thumbnailUrl: null,
        }
    }

    // Cloudinary (https://res.cloudinary.com/<cloud>/image/upload/v123/name.pdf)
    if (url.includes('res.cloudinary.com')) {
        return {
            source: 'Cloudinary',
            previewUrl: url,
            openUrl: url,
            // fl_attachment makes Cloudinary send the file as a download (works for image/upload PDFs)
            downloadUrl: url.includes('/image/upload/')
                ? url.replace('/image/upload/', '/image/upload/fl_attachment/')
                : url,
            // page 1 of the PDF as a JPG (only for image/upload PDFs)
            thumbnailUrl: url.includes('/image/upload/') && /\.pdf$/i.test(url)
                ? url.replace('/image/upload/', '/image/upload/pg_1,w_600/').replace(/\.pdf$/i, '.jpg')
                : null,
        }
    }

    // local file in /public (e.g. /resumes/sample.pdf) or any other direct PDF link
    return {
        source: url.startsWith('/') ? 'Hire The Fire' : 'Web',
        previewUrl: url,
        openUrl: url,
        downloadUrl: url,
        thumbnailUrl: null,
    }
}
