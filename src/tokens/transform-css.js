import * as tokens from "./temp/generated-tokens.js"
import fs from "fs"

const isConvertibleToNumber = (value) => +value === +value

const concatCssUnitIfNeeded = (name, value) => {
  if (value === 0) return value
  if (!isConvertibleToNumber(value)) return value

  const requireCssUnit = [
    "paragraphIndent",
    "paragraphSpacing",
    "fontSize",
    "lineHeight",
    "letterSpacing",
    "radius",
    "offsetX",
    "offsetY",
    "spread",
  ].some((property) => name.includes(property))

  if (requireCssUnit) return `${value / 16}rem`
  return value
}

const kebabCase = (s) =>
  s
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase()

const lightMode = {
  colors: {},
  shadows: {},
}

const darkMode = {
  colors: {},
  shadows: {},
}

const common = {}

for (const key in tokens) {
  if (Object.hasOwnProperty.call(tokens, key)) {
    const value = tokens[key]

    const lightColorIdentifier = "M3SysLight"
    const darkColorIdentifier = "M3SysDark"
    const lightReadOnlyIdentifier = "M3ReadOnlyLight"
    const darkReadOnlyIdentifier = "M3ReadOnlyDark"
    const lightElevationIdentifier = "M3ElevationLight"
    const darkElevationIdentifier = "M3ElevationDark"

    const isLightColor = key.includes(lightColorIdentifier)
    const isLightReadOnly = key.includes(lightReadOnlyIdentifier)
    const isLightElevation = key.includes(lightElevationIdentifier)

    const isDarkColor = key.includes(darkColorIdentifier)
    const isDarkReadOnly = key.includes(darkReadOnlyIdentifier)
    const isDarkElevation = key.includes(darkElevationIdentifier)

    if (isLightColor) {
      lightMode.colors[key.split(lightColorIdentifier)[1]] = value
    } else if (isLightReadOnly) {
      lightMode.colors[key.split(lightReadOnlyIdentifier)[1]] = value
    } else if (isLightElevation) {
      lightMode.shadows[`Elevation${key.split(lightElevationIdentifier)[1]}`] =
        value
    } else if (isDarkColor) {
      darkMode.colors[key.split(darkColorIdentifier)[1]] = value
    } else if (isDarkReadOnly) {
      darkMode.colors[key.split(darkReadOnlyIdentifier)[1]] = value
    } else if (isDarkElevation) {
      darkMode.shadows[`Elevation${key.split(darkElevationIdentifier)[1]}`] =
        value
    } else common[key] = value
  }
}

const getUpdatedWithAVar = (prev, currName, currVal, prefix = "") => `${prev}
      ${prefix}${kebabCase(currName)}: ${concatCssUnitIfNeeded(
  currName,
  currVal
)};`

const getCssVars = (colors, prefix = "--", initialValue = "") => {
  const addVar = (prev, curr) => {
    const value = colors[curr]

    if (typeof value === "object") {
      return getCssVars(value, `${prefix}${kebabCase(curr)}-`, prev)
    }

    return getUpdatedWithAVar(prev, curr, value, prefix)
  }

  return Object.keys(colors).reduce(addVar, initialValue)
}

const cssTokens = `
/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

:host,
:root {
  ${getCssVars(common)}
}

:root,
:host,
.agosh-theme-light {
  ${getCssVars(lightMode.colors)}
  ${getCssVars(lightMode.shadows)}
}

.agosh-theme-dark {
  ${getCssVars(darkMode.colors)}
  ${getCssVars(darkMode.shadows)}
}
`

fs.writeFileSync("src/tokens/temp/main.css", cssTokens)
console.log("✔ css tokens generated successfully.")
