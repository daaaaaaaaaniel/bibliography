if (Translator.BetterTeX) {
  if (!Translator.options.exportFileData && item.attachments && item.attachments.length) {
    item.attachments.forEach((att, i) => {
      entry.add({ name: `bdsk-file-${i + 1}`, value: (att.saveFile ? att.defaultPath : '') || att.localPath, enc: 'verbatim' })
    })
    for (const att of item.attachments) {
      if (att.localPath) {
        att.localPath = att.localPath.replace(RegExp("^\/.*?\/.*?\/"), "~/")
      }
    }
    entry.add({ name: 'file', value: item.attachments, enc: 'attachments' })
    return { cache: false }
  }
}