//  we will use a type variable,
//  a special kind of variable that works on types rather than values.

export interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: any;
}


// We’ve now added a type variable T to the identity function.
//  This T allows us to capture the type the user provides (e.g. number),
//  so that we can use that information later. Here, we use T again as the return type.
// On inspection, we can now see the same type is used for the argument and the return type.
// This allows us to traffic that type information in one side of the function and out the other.



// We say that this version of the identity function is generic,
//  as it works over a range of types. Unlike using any,
//   it’s also just as precise (ie, it doesn’t lose any information) 
//   as the first identity function that used numbers for the argument and return type.


// Once we’ve written the generic identity function,
//  we can call it in one of two ways. The first way is to pass all of the arguments,
//   including the type argument, to the function:
