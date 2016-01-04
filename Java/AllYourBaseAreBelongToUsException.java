package java.aybabtu;

/**
 * An {@code AllYourBaseAreBelongToUsException} is thrown when all your base are
 * belong to us.
 */
public class AllYourBaseAreBelongToUsException extends Exception {
    private static final long serialVersionUID = 2669454180887817304L;
    
    private static final String DEFAULT_MESSAGE =
            "All your base are belong to us";

    /**
     * Constructs a new exception with a default detail message.
     * The cause is not initialized, and may subsequently be initialized by a
     * call to {@link #initCause(Throwable)}.
     */
    public AllYourBaseAreBelongToUsException() {
        super(DEFAULT_MESSAGE);
    }

    /**
     * Constructs a new exception with the specified detail message.
     * The cause is not initialized, and may subsequently be initialized by a
     * call to {@link #initCause(Throwable)}.
     *
     * @param   message
     *          The detail message.
     *          If {@code null} is specified, a default detail message will be
     *          used.
     *          The detail message is saved for later retrieval by the
     *          {@link #getMessage()} method.
     */
    public AllYourBaseAreBelongToUsException(String message) {
        super(message == null ? DEFAULT_MESSAGE : message);
    }

    /**
     * Constructs a new exception with the specified detail message and cause.
     *
     * <p>Note that the detail message associated with {@code cause} is
     * <em>not</em> automatically incorporated in this exception's detail
     * message.
     *
     * @param   message
     *          The detail message.
     *          If {@code null} is specified, a default detail message will be
     *          used.
     *          The detail message is saved for later retrieval by the
     *          {@link #getMessage()} method.
     * @param   cause
     *          The cause, which is saved for later retrieval by the
     *          {@link #getCause()} method.
     *          A {@code null} value is permitted, and indicates that the cause
     *          is nonexistent or unknown.
     */
    public AllYourBaseAreBelongToUsException(String message, Throwable cause) {
        super(message == null ? DEFAULT_MESSAGE : message, cause);
    }

    /**
     * Constructs a new exception with the specified cause and a detail message
     * of {@code cause.toString()} (which typically contains the class and
     * detail message of {@code cause}), or a default detail message if
     * {@code cause} is {@code null}.
     *
     * @param   cause
     *          The cause, which is saved for later retrieval by the
     *          {@link #getCause()} method.
     *          A {@code null} value is permitted, and indicates that the cause
     *          is nonexistent or unknown: in this case, a default detail
     *          message will be used.
     */
    public AllYourBaseAreBelongToUsException(Throwable cause) {
        super(cause == null ? DEFAULT_MESSAGE : cause.toString(), cause);
    }
}
