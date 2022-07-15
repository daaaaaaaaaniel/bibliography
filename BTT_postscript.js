if (Translator.BetterTeX && item.attachments) {
  item.attachments.forEach((att, i) => {
    entry.add({ name: `bdsk-file-${i + 1}`, value: (att.saveFile ? att.defaultPath : '') || att.localPath, enc: 'verbatim' })
  })
}

// https://retorque.re/zotero-better-bibtex/exporting/scripting/#use--in-file-paths-to-avoid-the-bib-file-being-different-on-different-computers
// https://forums.zotero.org/discussion/comment/399187#Comment_399187
if (Translator.BetterTeX && !Translator.options.exportFileData && item.attachments && item.attachments.length) {
  for (const att of item.attachments) {
    if (att.localPath) {
      att.localPath = att.localPath.replace(RegExp("^\/.*?\/.*?\/"), "~/")
    }
  }
  entry.add({ name: 'file', value: item.attachments, enc: 'attachments' })
  return { cache: false }
}
