import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={600}
    height={300}
    viewBox="0 0 600 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
    <rect x="0" y="106" rx="3" ry="3" width="150" height="15" /> 
    <rect x="0" y="125" rx="0" ry="0" width="93" height="15" /> 
    <rect x="0" y="172" rx="8" ry="8" width="80" height="24" /> 
    <rect x="124" y="172" rx="8" ry="8" width="32" height="32" />
  </ContentLoader>
)

export default MyLoader