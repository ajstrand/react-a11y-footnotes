import { createContext } from 'preact'
import { useMemo, useContext, useEffect } from 'preact/hooks'
import PropTypes from 'prop-types'

export const FootnotesContext = createContext({})

export const FootnoteRef = props => {
  const { description } = props
  const {
    footnotes,
    footnotesTitleId,
    getFootnoteRefId,
    getFootnoteId,
    register,
  } = useContext(FootnotesContext)
  const idRef = useMemo(
    () => getFootnoteRefId(props),
    [getFootnoteRefId, props]
  )
  const idNote = useMemo(() => getFootnoteId(props), [getFootnoteId, props])
  const footnote = useMemo(
    () => ({ idRef, idNote, description }),
    [idRef, idNote, description]
  )

  // It is not possible to update the React state on the server, still the
  // footnote references need to be registered so the footnotes can be rendered.
  // In that case, we mutate the state directly so the footnotes work with SSR.
  if (!footnotes.has(footnote.idRef)) {
    footnotes.set(footnote.idRef, footnote)
  }

  // Once the application mounts, the footnotes state has been emptied and we
  // can properly register the current footnote in it, and unregister it if it
  // was to unmount.
  useEffect(() => {
    const unregister = register(footnote)

    return () => unregister()
  }, [register, footnote])

  return (
    <a
      className={props.className}
      style={props.style}
      id={idRef}
      href={`#${idNote}`}
      role='doc-noteref'
      aria-describedby={footnotesTitleId}
      data-a11y-footnotes-ref
    >
      {props.children}
    </a>
  )
}

FootnoteRef.propTypes = {
  description: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
}
