import { useContext } from 'preact/hooks'
import { FootnotesContext } from './FootnotesRef'

const Footnotes = props => {
  const { footnotes, footnotesTitleId } = useContext(FootnotesContext)
  const { Wrapper, Title, List, ListItem, BackLink } = props

  if (footnotes.size === 0) return null

  const references = Array.from(footnotes.values())

  return (
    <Wrapper data-a11y-footnotes-footer role='doc-endnotes'>
      <Title data-a11y-footnotes-title id={footnotesTitleId} />
      <List data-a11y-footnotes-list>
        {references.map(({ idNote, idRef, description }, index) => (
          <ListItem id={idNote} key={idNote} data-a11y-footnotes-list-item>
            {description}&nbsp;
            <BackLink
              data-a11y-footnotes-back-link
              href={'#' + idRef}
              aria-label={`Back to reference ${index + 1}`}
              role='doc-backlink'
            />
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )
}

Footnotes.defaultProps = {
  Wrapper: 'footer',
  Title: props => <h2 {...props}>Footnotes</h2>,
  List: 'ol',
  ListItem: 'li',
  BackLink: props => <a {...props}>↩</a>,
}

export default Footnotes;
