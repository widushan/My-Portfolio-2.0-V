/** Encode paths that contain spaces (e.g. "/images/webCertificates/IIT ML.jpg"). */
export const asset = (path: string) => encodeURI(path);
