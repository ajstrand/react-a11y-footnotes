import { test, describe, expect } from 'vitest';
import { FootnoteRef } from '../src/FootnotesRef'
import { Footnotes } from '../src/Footnotes'
import { FootnotesProvider } from '../src/FootnotesProvider'
import { getIdFromTree } from '../src/utils'

import { render, configure, screen } from '@testing-library/preact'

configure({ testIdAttribute: 'id' })

describe('The `getIdFromTree` helper', () => {
  test('should handle strings', () => {
    expect(getIdFromTree('hi')).toEqual('hi')
  })

  test('should handle trees', () => {
    expect(getIdFromTree(<>hi</>)).toEqual('hi')
    expect(getIdFromTree(<>hi i’m Kitty!</>)).toEqual('hi-im-kitty')
  })
})

describe('The `FootnoteRef` component', () => {
  test('should render an anchor', () => {
    render(
      <FootnotesProvider>
        <FootnoteRef description='CSS Counters are nice'>
          CSS counters
        </FootnoteRef>
      </FootnotesProvider>
    )

    const anchor = screen.getByTestId('css-counters-ref')
    expect(anchor).toHaveAttribute('id', 'css-counters-ref')
    expect(anchor).toHaveAttribute('href', '#css-counters-note')
  })

  test('should use provided id if any', () => {
    render(
      <FootnotesProvider>
        <FootnoteRef description='CSS Counters are nice' id='foobar'>
          CSS counters
        </FootnoteRef>
      </FootnotesProvider>
    )

    const anchor = screen.getByTestId('foobar-ref')
    expect(anchor).toHaveAttribute('id', 'foobar-ref')
    expect(anchor).toHaveAttribute('href', '#foobar-note')
    expect(anchor).toHaveAttribute('role', 'doc-noteref')
  })

  test('should provide styling capacities', () => {
    render(
      <FootnotesProvider>
        <FootnoteRef
          description='CSS Counters are nice'
          className='FootnoteRef'
          style={{ color: 'red' }}
        >
          CSS counters
        </FootnoteRef>
      </FootnotesProvider>
    )
    const anchor = screen.getByTestId('css-counters-ref')
    expect(anchor).toHaveAttribute('data-a11y-footnotes-ref')
    expect(anchor).toHaveAttribute('class', 'FootnoteRef')
    expect(anchor).toHaveAttribute('style', 'color: red;')
  })
})

describe('The `Footnotes` component', () => {
  test('should render nothing if there are no footnotes', () => {
    const { container } = render(
      <FootnotesProvider>
        <Footnotes />
      </FootnotesProvider>
    )

    expect(container).toBeEmptyDOMElement()
  })

  test('should render footnotes if any', () => {
    render(
      <FootnotesProvider>
        <FootnoteRef description='CSS Counters are nice'>
          CSS counters
        </FootnoteRef>
        <Footnotes />
      </FootnotesProvider>
    )

    screen.getByRole('doc-endnotes')
    screen.getByTestId('css-counters-note')
  })

  test('should use provided `footnotesTitleId`', () => {
    render(
      <FootnotesProvider footnotesTitleId='foobar'>
        <FootnoteRef description='CSS Counters are nice'>
          CSS counters
        </FootnoteRef>
        <Footnotes />
      </FootnotesProvider>
    )

    screen.getByTestId('foobar')
    const footnote = screen.getByTestId('css-counters-ref')
    expect(footnote).toHaveAttribute('aria-describedby', 'foobar')
  })

  test('should provided styling capacity', () => {
    render(
      <FootnotesProvider footnotesTitleId='foobar'>
        <FootnoteRef description='CSS Counters are nice'>
          CSS counters
        </FootnoteRef>
        <Footnotes
          Wrapper={props => <footer {...props} id='test-wrapper' />}
          Title={props => <h3 {...props} id='test-title' />}
          List={props => <ul {...props} id='test-list' />}
          ListItem={props => <li {...props} id='test-list-item' />}
          BackLink={props => <a {...props} id='test-back-link' />}
        />
      </FootnotesProvider>
    )

    expect(screen.getByTestId('test-wrapper')).toHaveAttribute(
      'data-a11y-footnotes-footer'
    )
    expect(screen.getByTestId('test-title')).toHaveAttribute(
      'data-a11y-footnotes-title'
    )
    expect(screen.getByTestId('test-list')).toHaveAttribute(
      'data-a11y-footnotes-list'
    )
    expect(screen.getByTestId('test-list-item')).toHaveAttribute(
      'data-a11y-footnotes-list-item'
    )
    expect(screen.getByTestId('test-back-link')).toHaveAttribute(
      'data-a11y-footnotes-back-link'
    )
  })
})

// test('Testing sum', ()=> {
//     expect(2+2).toBe(4)
// });