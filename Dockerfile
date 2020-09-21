FROM node:latest

WORKDIR /tmp
RUN wget https://downloadarchive.documentfoundation.org/libreoffice/old/6.4.5.2/deb/x86_64/LibreOffice_6.4.5.2_Linux_x86-64_deb.tar.gz -O libo.tar.gz
RUN apt update \
  && apt -y install libxinerama1 libfontconfig1 libdbus-glib-1-2 libcairo2 libcups2 libglu1-mesa libsm6 \
  && tar -zxvf libo.tar.gz
WORKDIR /tmp/LibreOffice_6.4.5.2_Linux_x86-64_deb/DEBS
RUN dpkg -i *.deb

RUN mkdir /opt/carbone_report
COPY . /opt/carbone_report
WORKDIR /opt/carbone_report
RUN yarn
VOLUME /mnt/reports
CMD node index