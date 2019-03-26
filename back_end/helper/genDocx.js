const docx = require('docx')
const fs = require('fs')

var doc = new docx.Document()

const createHeading = header => {
  return new docx.Paragraph()
    .addRun(new docx.TextRun(header).allCaps())
    .heading1()
    .thematicBreak()
    .spacing({ before: 300, after: 300 })
}

const createIntro = (name, address, email, phone) => {
  return new docx.Paragraph(name)
    .title()
    .addRun(
      new docx.TextRun(address)
        .size(20)
        .allCaps()
        .break()
    )
    .addRun(
      new docx.TextRun(`${email}  |  ${phone}`)
        .size(20)
        .allCaps()
        .break()
    )
    .spacing({ line: 300, after: 300 })
    .center()
}

const createContent = content => {
  content.forEach(el => {
    doc.addParagraph(
      new docx.Paragraph()
        .addRun(new docx.TextRun(el).size(25).italic())
        .bullet()
    )
  })
}

const createLineTab = (left, right) => {
  return new docx.Paragraph()
    .addRun(new docx.TextRun(left).bold())
    .addRun(new docx.TextRun(right).bold().tab())
    .maxRightTabStop()
}

const createExperience = experience => {
  doc.addParagraph(createHeading('Experience'))
  if (experience) {
    experience.forEach(el => {
      doc.addParagraph(createLineTab(el.compName, el.loc))
      doc.addParagraph(createLineTab(el.pos, el.year))
      createContent(el.content)
    })
  }
}

const createProfile = content => {
  doc.addParagraph(createHeading('Profile'))
  createContent(content)
}

const createEducation = education => {
  doc.addParagraph(createHeading('Education'))
  if (education) {
    education.forEach(el => {
      doc.addParagraph(createLineTab(el.school, el.loc))
      doc.addParagraph(createLineTab(el.pos, el.year))
      createContent(el.content)
    })
  }
}

module.exports.createResume = (education, experience, generalInfo, profile) => {
  doc.addParagraph(
    createIntro(
      generalInfo.title,
      generalInfo.address,
      generalInfo.email,
      generalInfo.phone
    )
  )
  createProfile(profile)
  createExperience(experience)
  createEducation(education)
  genDoc(generalInfo.title)
}

const genDoc = title => {
  var packer = new docx.Packer()
  packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(`${title}.docx`, buffer)
  })
}
