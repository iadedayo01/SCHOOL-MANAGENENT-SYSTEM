export const successResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        status: true,
        message: message,
        data: data
    })
}

export const errorResponse = (res, statusCode, message, data=null) => {
    return res.status(statusCode).json({
        status: false,
        message: message
    })
}