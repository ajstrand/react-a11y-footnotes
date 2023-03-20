import FootnoteRef from './FootnotesRef'
import Footnotes from './Footnotes'
import FootnotesProvider from './FootnotesProvider'
import "./styles.css"
const App = () => (
  <FootnotesProvider footnotesTitleId='foobar'>
    <FootnoteRef description='CSS Counters are nice'>CSS counters</FootnoteRef>
    <Footnotes />
  </FootnotesProvider>
)

export default App