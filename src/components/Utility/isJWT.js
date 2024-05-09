export default function isJWT(token) {
    const parts = token.split('.');
    
    // JWTs have exactly three parts
    if (parts.length !== 3) {
      return false;
    }
  
    // Try to Base64 decode each part
    try {
      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));
  
      // Verify that decoded parts are valid JSON objects
      if (typeof decodedHeader !== 'object' || typeof decodedPayload !== 'object') {
        return false;
      }
  
      // Optionally, you can further verify the structure of decodedHeader and decodedPayload
    
      // If all checks pass, it's likely a JWT
      return true;
    } catch (error) {
      // An error occurred during decoding or parsing, not a JWT
      return false;
    }
  }