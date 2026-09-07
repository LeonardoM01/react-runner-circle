const ErrorMessage = ({ message, error }) => {
    console.error(error || message);

    return (

        <div className="flex justify-center items-center py-8">
            <div className="text-red-500">Erro: {message}</div>
        </div>
    )
}

export default ErrorMessage