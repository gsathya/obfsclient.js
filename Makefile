install:
	cd src
	zip -r xulschool.xpi *

all:
	rm xulschool.xpi
	cd src
	zip -r xulschool.xpi *
clean:
	rm xulschool.xpi
