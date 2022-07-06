if (Translator.BetterTeX && item.attachments) {
  item.attachments.forEach((att, i) => {
    entry.add({ name: `bdsk-file-${i + 1}`, value: ((att.saveFile ? att.defaultPath : '') || att.localPath) })
  })
}