 'use client'
 import React, { Component } from 'react'

export class ErrorBoundery extends Component {

    state = { hasError: false }

    static getDrivedStateFromError(error){
        return {hasError: true}
    }

    componentDidCatch(error, info){
        console.log(error, info)
    }

  render() {
   if(this.state.hasError){
    return this.props.fallback
   }
   return this.props.children
  }
}

export default ErrorBoundery
