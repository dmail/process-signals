import { registerUngaranteedProcessTeardown } from "../index.js"

registerUngaranteedProcessTeardown((reason) => {
  console.log(reason)
})
