from fontTools.ttLib import TTFont

need = "áéíóúÁÉÍÓÚñÑüÜ¿¡·çÇàèòÀÈÒ€–—‘’“”…•→←↑↓−"
names = [
    "inter-latin-500",
    "inter-latin-600",
    "plus-jakarta-sans-latin-700",
    "plus-jakarta-sans-latin-800",
]
for name in names:
    for suffix in ["", "-v2"]:
        path = f"public/fonts/{name}{suffix}.woff2"
        font = TTFont(path)
        cmap = font.getBestCmap()
        missing = [ch for ch in need if ord(ch) not in cmap]
        print(f"{name}{suffix or ' (orig)'}: glyphs={len(font.getGlyphOrder())} missing={''.join(missing) or 'none'}")
