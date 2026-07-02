import { Component } from 'react'
import { BUSINESS } from './data.js'

// Cattura eventuali errori di rendering e mostra una schermata di
// cortesia (a tema) invece di una pagina bianca.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // In produzione qui si potrebbe loggare a un servizio esterno.
    console.error('Errore catturato da ErrorBoundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="errbound">
        <div className="errbound__card">
          <h1>Ops, la pizza è caduta 🍕</h1>
          <p>
            Qualcosa non ha funzionato nel caricare la pagina. Riprova tra un attimo —
            nel frattempo puoi sempre chiamarci per ordinare.
          </p>
          <div className="errbound__btns">
            <button className="btn btn--tomato" onClick={() => window.location.reload()}>
              Ricarica la pagina
            </button>
            <a className="btn btn--dark" href={`tel:${BUSINESS.phoneHref}`}>
              Chiama {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>
    )
  }
}
