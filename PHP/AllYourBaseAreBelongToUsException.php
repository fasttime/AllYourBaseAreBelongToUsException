<?php
/**
 * The exception that is thrown when all yor base are belong to us.
 */
class AllYourBaseAreBelongToUsException extends Exception
{
    /**
     * Creates a new AllYourBaseAreBelongToUsException.
     * 
     * @param string $message The exception message.
     * @param int $code The exception code.
     * @param Throwable $previous The previous throwable used for the exception chaining.
     */
    public function __construct(
        $message = 'All your base are belong to us',
        $code = 0,
        Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
?>
