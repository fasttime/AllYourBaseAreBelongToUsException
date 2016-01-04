using System;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;

namespace System
{
    // Summary:
    //      The exception that is thrown when all yor base are belong to us.
    [Serializable]
    [ComVisible(true)]
    public class AllYourBaseAreBelongToUsException : Exception
    {
        private const String DefaultMessage = "All your base are belong to us";

        // Summary:
        //      Initializes a new instance of the System.AYBABTU.AllYourBaseAreBelongToUsException
        //      class.
        public AllYourBaseAreBelongToUsException() : base(DefaultMessage)
        { }

        // Summary:
        //      Initializes a new instance of the System.AYBABTU.AllYourBaseAreBelongToUsException
        //      class with a specified error message.
        //
        // Parameters:
        //  message:
        //     The message that describes the error.
        public AllYourBaseAreBelongToUsException(string message) :
            base(message == null ? DefaultMessage : message)
        { }

        // Summary:
        //      Initializes a new instance of the System.AYBABTU.AllYourBaseAreBelongToUsException
        //      class with serialized data.
        //
        // Parameters:
        //  info:
        //      The object that holds the serialized object data.
        //
        //  context:
        //      The contextual information about the source or destination.
        protected AllYourBaseAreBelongToUsException(
            SerializationInfo info,
            StreamingContext context
            ) : base(info, context)
        { }

        // Summary:
        //      Initializes a new instance of the System.AYBABTU.AllYourBaseAreBelongToUsException
        //      class with a specified error message and a reference to the inner exception that is
        //      the cause of this exception.
        //
        // Parameters:
        //  message:
        //      The error message that explains the reason for the exception.
        //
        //  innerException:
        //      The exception that is the cause of the current exception.
        //      If the innerException parameter is not a null reference, the current exception is
        //      raised in a catch block that handles the inner exception.
        public AllYourBaseAreBelongToUsException(string message, Exception innerException) :
            base(message == null ? DefaultMessage : message, innerException)
        { }
    }
}
