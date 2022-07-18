# My Bibliography

This repository contains software resources that help me manage my personal research library and generate bibliographies in my digital writing. I use tools like [Zotero](https://www.zotero.org "Zotero"), [Better BibTeX for Zotero](https://retorque.re/zotero-better-bibtex/ "Better BibTeX for Zotero"), [Zotfile](https://zotfile.com "Zotfile"), [BibDesk](https://bibdesk.sourceforge.io "BibDesk"), and [Pandoc](https://pandoc.org "Pandoc"). 

# Scripts
## Better BibTeX for Zotero citation key formula  
- [BBT_citation_key_format.txt](BBT_citation_key_format.txt)  

### Example  

| key | citation |
|---|---|
| `lee.etal2004_Deri-a` | Benjamin Lee and Edward LiPuma, “Deriving the Derivative,” in *Financial Derivatives and the Globalization of Risk* (Durham: Duke University Press, 2004), 107–40.  |


### Explanation  

First try to use the Short Title field (`ShortTitle`).

- `authEtal2(clean=true).lower.replace(find="-",replace="").replace(find=/\..*/,replace='.etal')`  
	- `authEtal2`   
	The last name of the first author, and the last name of the second author if there are two authors or ".etal" if there are more than two
	- `.lower.replace(find="-",replace="").replace(find=/\..*/,replace='.etal')`  
	Lowercase. Remove any hyphens. Remove the second author. (Technically, remove everything after the first "." and replace it with ".etal".)   
- `year+len('>',5) `  
	4-digit year
- `ShortTitle.skipwords.capitalize.len('>', 1).select(1,2).clean.replace(find="-",replace="").condense('').substring(1,4).prefix(_)`  
- Process the verbatim text of the Short Title field. Get the first four characters  (of the first two words combined) and remove hyphens and spaces.
- `postfix('#%(a)s')`  
	If duplicate cite keys exist, postfix it by adding '#' and a single lowercase letter.

- `BookTitle.clean.replace(find=/[a-z0-9\s]+/g,replace="").condense('').substring(1,4).prefix('_')+extra(session).clean.len('>',0).prefix('.')`  
	For book chapters, additionally include the book title (abbr. in all caps) and chapter number. 

If the Short Title field is empty, try doing the same thing using the Title field (`shorttitle `).

The generator tries up to 8 different formulas to produce a cite key. 

1. `.match('.etal').len('<=',17)` + Short title  
	Use the first formula if there are more than one author, and the first author's last name is shorter than 12 characters.  

	[//]: # ( the lengths of .etal is five ... 17-5=12)

2. `.match('.etal').replace(find=/\..*/,replace='').substring(1,12).postfix('.etal')` + Short title  
	If there are more than one author and the their last name is longer than 12 characters, truncate after the first 12 and append ".etal"

3. `.len('>',12).substring(1,12)` + Short title  
	If there is only one author and their last name is longer than than 12 characters, truncte it.

4. Entire last name of authors + Short title  
	If there is only one author and their last name is not longer than 12 characters, use the entire name.

The final four attempts are the same as these first four, but they use the regular title instead of the short title.


## ZotFile Settings

Delimiter between authors: ` & `  
Maximum number of authors: 2  
Add suffix when authors are omitted: ` et al.`  

**Advanced Settings**  
- [x] Remove special charactes (diacritics) from filename

[//]: # (This setting applies to file names only, not folder names)



### Renaming formula  

**File Name**  

```
{%a{ %y} -}{ %C.}{ %h| %W}{ (in '%K')} @%b
```

- `%a` – Author  
- `%y` – Year  
- `%C`\* – Chapter (in "Extras")  
- `%h` – Short title  
- `%W`\* – Title without semicolon  
- `%k`\* – Publication title (truncate after semicolon) *(Book Section only)*
- `%b` – Cite key    

[//]: # (`%W` may be redundant of `%t` = `titleFormated`)  

**Subfolder Path**  
```
/ZotFile/%m{/%K}{/vol. %v}{/no. %e}/
```

- `%m`\* – Item type (uses "Book" for book section)  
- `%K`\* – Publication title (truncate after semicolon)
- `%v` – Volume
- `%e` – Issue

\* Custom  

*Example*  

> Lee & LiPuma 2004 - Global Flows and the Politics of Circulation (1 - Financial Derivatives and the Globalization of Risk) @lee.etal2004_Glob.pdf

### Custom Wildcards

See [ZotFile_wildcards.json](ZotFile_wildcards.json) in this repository.

- `%B` should be used for creating parent **folders** containing texts in an anthology or essay collection. It outputs text like *bookTitle (year)*.
    - if there's an editor, it should include the editor. If there's no editor, assume it's a monograph and format like *Author year - bookTitle*. 
        -  for monographs, use :`{%a %y - %B}` 
        - for anthologies/collections, use : `{%d (eds.) %y - %B}`
        - `/ZotFile{/%d (eds.) %y - %B}` or just `/ZotFile{/%B (%y)}`
- `%P` should be used for indicating the page numbers of book sections. Use it as an {option} wild-card in **filenames**. It makes alphabetical sorting more useful.
- `%W` is for formatting the title field to mimic the short title (?). Use it as a fallback for items without a short title.
- `%C` is for `chapter-number` in the "Extras" field.
- `%J` behaves similarly to stock `%j`, but it replaces colons with dashes.
- `%K` is like `%J`, but it removes everything after the semicolon. And it only applies to book sections.


See [User defined wildcards](http://zotfile.com/#user-defined-wildcards) in the ZotFile documentation for more details.

## License
[BBT_citation_key_format.txt](BBT_citation_key_format.txt) and [BTT_postscript.js](BTT_postscript.js) are licensed under MIT License (following the precedent set by [Better BibTeX for Zotero](https://github.com/retorquere/zotero-better-bibtex/blob/master/LICENSE "zotero-better-bibtex/LICENSE").  

[ZotFile_wildcards.json](ZotFile_wildcards.json) is licensed under [GNU General Public License, version 3.0](https://github.com/jlegewie/zotfile#license "zotfile#license").  