install:
	cd hello
	zip -r xulschool.xpi *

all:
	rm xulschool.xpi
	cd hello
	zip -r xulschool.xpi *
clean:
	rm xulschool.xpi
