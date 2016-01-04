#pragma once

#include <exception>

#ifdef _MSC_VER
#define NOEXCEPT _NOEXCEPT
#else
#define NOEXCEPT noexcept
#endif

namespace std
{
    class all_your_base_are_belong_to_us_exception : public exception
    {
    public:
        virtual const char * what() const NOEXCEPT override
        {
            return "All your base are belong to us";
        }
    };
}
