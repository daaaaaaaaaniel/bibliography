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

  // https://github.com/retorquere/zotero-better-bibtex/issues/2220#issuecomment-1192425830
  function split(title) {
    const m = (title || '').match(/(.+?)([?]"|:" |[?:;])(.*)/)
    return m ? { title: m[1] + m[2].replace(/[:]/, "").trim(), sub: m[3].trim() } : null
  }
  let title

  if (title = split(reference.has.booktitle && reference.has.booktitle.value)) {
    reference.add({ name: 'booktitle', value: title.title })
    reference.add({ name: 'booksubtitle', value: title.sub })
  }

  // Authors who use parentesis in their titles break all sorts of conventions. Don't even bother seriously parsing.
  if ((title = split(reference.has.title && reference.has.title.value)) && !title.title.match(/\((?!.*\))/)) {
    reference.add({ name: 'title', value: title.title })
    reference.add({ name: 'subtitle', value: title.sub })
  }
  
  return { cache }
}