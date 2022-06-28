# My Bibliography Scripts  

## Better BibTeX for Zotero citation key formula  

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


## ZotFile  

### Renaming formula  

**File Name**  




```
{%a -}{ %C}{ %h| %W} (%b)
```

- `%a` – Author  
- `%C`\* – Chapter (in "Extras")  
- `%h` – Short title  
- `%W`\* – Title without semicolon  
- `%b` – Cite key  

[//]: # (`%W` may be redundant of `%t` = `titleFormated`)  

**Subfolder Path**  
`/ZotFile/%T{/%J}{/vol. %v}{/no. %e}/`

- `%T` – Item type  
- `%J`\* – Publication title  
- `%v` – Volume
- `%e` – Issue

\* Custom  

*Example*  

> Lee & LiPuma - 1 Global Flows and the Politics of Circulation [lee.etal2004_Glob].pdf

### Custom Wildcards

- `%B` should be used for creating parent **folders** containing texts in an anthology or essay collection. It outputs text like *bookTitle (year)*.
    - if there's an editor, it should include the editor. If there's no editor, assume it's a monograph and format like *Author year - bookTitle*. 
        -  for monographs, use :`{%a %y - %B}` 
        - for anthologies/collections, use : `{%d (eds.) %y - %B}`
        - `/ZotFile{/%d (eds.) %y - %B}` or just `/ZotFile{/%B (%y)}`
- `%P` should be used for indicating the page numbers of book sections. Use it as an {option} wild-card in **filenames**. It makes alphabetical sorting more useful.
- `%W` is for formatting the title field to mimic the short title (?). Use it as a fallback for items without a short title.
- `%C` is for `chapter-number` in the "Extras" field.
- `%J` behaves similarly to stock %j, but it replaces colons with dashes.

See [User defined wildcards](http://zotfile.com/#user-defined-wildcards) in the ZotFile documentation for more details.