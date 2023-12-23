// This is a error handling middleware which is created using the instance of class Error
export default function ErrorHandler(statusCode,message){
    const error = new Error();
    error.message = message;
    error.statusCode = statusCode;
    
    return error;
}