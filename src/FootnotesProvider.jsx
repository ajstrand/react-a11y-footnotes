import { useEffect, useState, useCallback } from 'preact/hooks'
import { FootnotesContext } from './FootnotesRef'
import { getIdFromTree } from './utils'
const FootnotesProvider = ({ children, footnotesTitleId }) => {
  const [footnotes, setFootnotes] = useState(new Map())
  const getBaseId = useCallback(
    ({ id, children }) => id || getIdFromTree(children),
    []
  )
  const getFootnoteRefId = useCallback(
    props => getBaseId(props) + '-ref',
    [getBaseId]
  )
  const getFootnoteId = useCallback(
    props => getBaseId(props) + '-note',
    [getBaseId]
  )

  // When JavaScript kicks in and the application mounts, reset the footnotes
  // store which was mutated by every reference.
  useEffect(() => setFootnotes(new Map()), [])

  const register = useCallback(footnote => {
    setFootnotes(footnotes => {
      const clone = new Map(footnotes)
      if (!clone.has(footnote.idRef)) clone.set(footnote.idRef, footnote)
      return clone
    })

    // Return a function which can be used to unregister the footnote. This
    // makes it convenient to register a footnote reference on mount, and
    // unregister it on unmount.
    return () => {
      setFootnotes(footnotes => {
        const clone = new Map(footnotes)
        clone.delete(footnote.idRef)
        return clone
      })
    }
  }, [])

  return (
    <FootnotesContext.Provider
      value={{
        footnotes,
        footnotesTitleId,
        getFootnoteRefId,
        getFootnoteId,
        register,
      }}
    >
      {children}
    </FootnotesContext.Provider>
  )
}

FootnotesProvider.defaultProps = {
  footnotesTitleId: 'footnotes-label',
}

export default FootnotesProvider
