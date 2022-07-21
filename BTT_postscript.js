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
  return { cache }
}

  // if (item.extra) {
  //   // reference.add({ name: 'note', value: item.extra.split('\n').filter(line => !line.startsWith('chapter-number:')).join('\n') })
  //   reference.add({ name: 'chapter', value: item.extra.replace(/^.*?\s*?.*?(chapter-number:\s+)(\S+)[\s]*.*/mg, '$2') });
  // }