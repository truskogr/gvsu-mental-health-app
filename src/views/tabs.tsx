import React from "react"
import ResourcesView from "./resources_view"
import HomeView from "./home_view"
import GuideView from "./guide_view"
import FAQView from "./faq_view"
import TechniqueView from "./technique_view"

export const Resources: React.FC = () => {
    return (
      <ResourcesView />
    )
}

export const Home: React.FC = () => {
    return (
        <HomeView/>
    )
}

export const Guide: React.FC = () => {
    return (
        <GuideView />
    )
}

export const FAQ: React.FC = () => {
    return (
        <FAQView />
    )
}

export const Techniques: React.FC = () => {
    return (
        <TechniqueView />
    )
}