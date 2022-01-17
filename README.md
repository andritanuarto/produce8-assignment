## Getting Started

`yarn dev` - to run development
Open (http://localhost:3000) with your browser to see the page.

## What happens if the server error?

The error is handled in `calculatorSlice.ts` in the extraReducers function.

When the error happens, it will change the default error state to true.

To test the error, try to change the interest rate to 0 or 0.5. It will show the error message below in the monthly payment section.

`There was a problem calculating your mortgage. Please check your inputs`

## What happens while waiting the error?

The loading request is handled in `getMonthlyPayment.pending` and `getMonthlyPayment.fulfilled` in `calculatorSlice.ts`.
by changing the loading state.

## How can this be made accessible?

Here are some of the initiatives to make the page accessible

- Implementing semantic HTML to help the screen reader and other user devices to determine the significance of the content
- Aria label to help screen reader to determine the meaning for input action
- Implementing next/header to put meta and title page

Another recommendation is to make the text has more contrast with the background as possible.
Current design it doesn't pass the A or AA or AAA compliance.

You can test it using contrast checker (https://webaim.org/resources/contrastchecker/)

## How would you display this on a mobile device?

The page is fully responsive on desktop, tablet, and phone screen sizes.

## What kind of tests can you write for this UI?

Run `yarn test` to run test

I realized when about to finish the page this link https://github.com/Produce8/P8FrontendAssignment/files/7866197/CodeExercise.pdf has question about test but those links below are not:

- https://github.com/Produce8/P8FrontendAssignment/blob/main/CodeExercise.pdf
- https://github.com/Produce8/P8FrontendAssignment/blob/main/CodeExercise.png

Because of a limited time I only write the most complext component which is in `mainContent.test.tsx`
and also `calculatorSlice.test.ts`.
