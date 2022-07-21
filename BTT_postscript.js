if (Translator.BetterTeX) {
  let cache = true
  // This adds bdsk-file-x fields for BibDesk
  if (!Translator.options.exportFileData && item.attachments && item.attachments.length) {
    item.attachments.forEach((att, i) => {
      entry.add({ name: `bdsk-file-${i + 1}`, value: (att.saveFile ? att.defaultPath : '') || att.localPath, enc: 'verbatim' })
    })
    // This uses relative paths instead of absolute
    for (const att of item.attachments) {
      if (att.localPath) {
        att.localPath = att.localPath.replace(RegExp("^\/.*?\/.*?\/"), "~/")
      }
    }
    entry.add({ name: 'file', value: item.attachments, enc: 'attachments' })
    cache = false
  }
  // No need to test for the value, BBT does nothing if the value is empty
  entry.add({ name: 'chapter', value: extra.kv.session});
  entry.add({ name: 'journalAbbreviation', value: extra.kv.journalAbbreviation});
  // BROKEN - Split long Book Title into Book Title, Book Subtitle
  // if (reference.has.publicationTitle) {
  if (reference.has.booktitle) {
    const booktitles = reference.booktitle.value.match(/(.+?)([?:;])(.*)/)
    if (booktitles) {
      let booktitle = booktitles[1] + (booktitles[2] === '?' ? '?' : '')
      reference.add({ name: 'booktitle', value: booktitle })
      reference.add({ name: 'booksubtitle', value: booktitles[3].trim() })
    }
  }
  // Split long Title into Title, Subtitle
  // https://github.com/retorquere/zotero-better-bibtex/issues/1759#issuecomment-798949707
  if (reference.has.title) {
    const titles = reference.has.title.value.match(/(.+?)([?:;])(.*)/)
    if (titles) {
      let title = titles[1] + (titles[2] === '?' ? '?' : '')
      reference.add({ name: 'title', value: title })
      reference.add({ name: 'subtitle', value: titles[3].trim() })
    }
  }
  return { cache }
}


  // if (item.extra) {
  //   // reference.add({ name: 'note', value: item.extra.split('\n').filter(line => !line.startsWith('chapter-number:')).join('\n') })
  //   reference.add({ name: 'chapter', value: item.extra.replace(/^.*?\s*?.*?(chapter-number:\s+)(\S+)[\s]*.*/mg, '$2') });
  // }

  // BROKEN - Split long Title into Title, Subtitle
  // if (item.title) {
  //   this.add({ name: 'subtitle', value: item.title.replace(/^.* ?: (.*)/g, '$1') });
  //   this.add({ name: 'title', value: item.title.replace(/^(\S*) ?: .+/g, '$1') });
  // }
  //