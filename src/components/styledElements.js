import styled from "styled-components"

export const FlexWrapper = styled.div`
  display: flex;
  align-items: ${props => (props.AlignedCentered ? "center" : "")};
  justify-content: space-between;
  justify-content: ${props => (props.FlexEnd ? "flex-end" : "")};
`

export const HeadingLarge = styled.h1``

export const FlexColumn = styled.div``

export const ContentBox = styled.div``

export const Section = styled.section`
  padding: 2rem 0;
  padding: ${props => (props.Medium ? "3rem 0" : "")};
  padding: ${props => (props.Large ? "4rem 0" : "")};
  padding: ${props => (props.ExtraLarge ? "8rem 0" : "")};
`

export const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${props => (props.Light ? "rgb(118, 118, 118)" : "")};
`

export const CardWrapper = styled.div``

export const CardContents = styled.div``

export const ImageWrapper = styled.div`
  margin-right: ${props => (props.MarginRight ? "1rem" : "")};
`

export const CardData = styled.div`
  padding: 1rem 0;
`
export const HeadingMedium = styled.h2``

export const CardHeading = styled.h2`
  font-size: 1.25rem;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  margin-bottom: 0;
`

export const CardHeadingSmall = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0;
`

export const CategoryWrapper = styled.div``

export const CategoryContent = styled.div``

export const CategoryContentWrap = styled.div``

export const CategoryTitleWrap = styled.div``

export const CategoryTitle = styled.h3`
  font-size: 1.1rem;
`

export const CategoryDescriptionWrap = styled.div``

export const CategoryDescription = styled.p``

export const Line = styled.hr``

export const PageListWrapper = styled.div``

export const PageListContents = styled.div``

export const PageItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border-radius: 4px;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`

export const SearchItemWrapper = styled.div`
  display: flex;
  align-items: center;
  align-items: ${props => (props.FlexStart ? "flex-start" : "")};
  padding: 0.8rem;
  border-top: 1px solid #ddd;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`

export const CategorySearchItemTitle = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(55, 53, 47, 0.6);
  font-size: 12px;
  overflow: hidden;
`

export const PageIconWrapper = styled.div`
  margin-right: 0.5rem;
  display: flex;
  margin-right: ${props => (props.LargeMargin ? "1rem" : "")};
`

export const PageTitleWrapper = styled.div``

export const SearchTitleWrapper = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  overflow: hidden;
`

export const SearchMetaWrapper = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 2rem;
  width: 100%;
`

export const PageTitle = styled.h2`
  margin-bottom: 0;
  font-size: 1rem;
`

export const CategoryImageLoopWrapper = styled.div`
  position: relative;
  margin: 1rem 0 1.5rem 0;
  max-width: 43.75em;
`

export const CategoryImageLoop = styled.div`
  height: 100px;
  background-image: url(https://airbnb.io/img/projects/airpal2.png);
  background-size: contain;
`
export const CategoryImageLoopTint = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.8),
    rgb(255, 255, 255)
  );
`

export const PostMetaWrapper = styled.div``

export const FeaturedImage = styled.div`
  margin: 1.5rem 0;
`
export const Article = styled.article`
  @media (min-width: 992px) {
    padding-right: ${props => (props.SidebarActive ? "3.5rem" : "")};
  }
`

export const ArticleContents = styled.div`
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  a {
    color: #6a299a;
    font-weight: bold;
  }
  ul li,
  ol li {
    margin-bottom: 0.5rem;
  }
  img,
  iframe {
    width: auto;
    height: auto;
    margin: 1rem 0;
    max-width: 100%;
  }
  blockquote {
    border-style: solid;
    border-width: 1px;
    padding: 1rem 1.25rem;
    position: relative;
    background-color: #fdf3e1;
    border: 0;
    color: #33475b;
    border-radius: 0;
    margin: 1.25rem 0;
    font-weight: 600;
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export const PostCategoryMeta = styled.span`
  display: block;
`

export const Span = styled.span`
  color: ${props => (props.White ? "#fff" : "")};
  font-weight: ${props => (props.Header ? "600" : "")};
  text-transform: ${props => (props.Transformed ? "capitalize" : "")};
  font-size: ${props => (props.Header ? "1.2rem" : "")};
`

export const FormWrapper = styled.div`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f2f2f2;
  padding: 2rem;
  border-radius: 8px;
`

export const Form = styled.form`
  width: 100%;
  display: block;
`

export const InputField = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 1rem;
  margin-bottom: ${props => (props.Last ? "0" : "")};
`

export const FancyInputWrapper = styled.div`
  position: relative;
`
export const FancyInputIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
`

export const FancyInput = styled.input`
  border-width: 2px;
  border-style: solid;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-color: rgba(0, 0, 0, 0);
  padding-left: 28px;
  width: 100%;
  border-radius: 4px;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: ${props => (props.NoPad ? "1rem" : "")};
  &:focus {
    border-color: rgba(0, 0, 0, 0.25);
  }
`

export const Input = styled.input`
  width: 100%;
`

export const FormTitle = styled.h1`
  font-size: 1rem;
  margin-bottom: 1rem;
`

export const Button = styled.button`
  outline: none;
  border: 0;
  width: 100%;
  font-size: 1rem;
  border-radius: 4px;
  background-color: #6a299a;
  padding: 0.5rem 1rem;
  color: #fff;
  font-weight: 700;
  &:hover {
    background-color: #591f84;
  }
`

export const ErrorHelper = styled.span`
  padding-top: 0.2rem;
  display: block;
  color: #ef5959;
  font-size: 0.7rem;
`

export const ContentBoxForm = styled.div`
  padding: 1rem 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  a {
    font-weight: 600;
  }
`

export const ContentBoxMessage = styled.p`
  opacity: 0.75;
  margin-bottom: 0;
`

export const Topbar = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`

export const TopbarNav = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
`

export const TopbarNavItem = styled.li`
  margin: 0;
  padding: 0;
  a {
    font-weight: 700;
    display: block;
    margin-right: 1.25rem;
    font-size: 0.9rem;
    &:hover {
      text-decoration: none;
      color: #c33878;
      svg {
        path {
          fill: #c33878 !important;
        }
      }
    }
  }
  &:last-child {
    a {
      margin-right: 0;
    }
  }
`

export const IconWrapper = styled.figure`
  margin: 0;
  width: 16px;
  margin-right: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  svg {
    path {
      fill: #6a299a;
    }
    width: 15px;
    height: 15px;
  }
  .loginweb {
    width: 20px;
    height: 20px;
    display: block;
    fill: rgba(202, 204, 206, 0.4);
    flex-shrink: 0;
    backface-visibility: hidden;
    margin-right: 8px;
  }
`

export const LogoutLink = styled.span`
  font-weight: 700;
  display: block;
  color: #6a299a;
  margin-right: 1.25rem;
  font-size: 0.9rem;
  &:hover {
    text-decoration: none;
    color: #c33878;
    cursor: pointer;
  }
`

export const RelatedArticlesWrapper = styled.div`
  background-color: #fdf3e1;
  padding: 2rem 1rem;
  border-radius: 4px;
  margin-top: 3.5rem;
  border: 2px solid #eee;
  position: relative;
  &:before {
    content: "";
    top: -2.5rem;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #eee;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (min-width: 992px) {
    padding: 0;
    padding-bottom: 1rem;
    padding-left: 1.5rem;
    border: none;
    margin-top: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    position: sticky;
    top: 3rem;
    background-color: transparent;
    &:before {
      display: none;
    }
  }
  @media (max-width: 992px) {
    .related-article {
      &:hover {
        background-color: #f9e9cd;
      }
    }
  }
`

export const RelatedArticlesHeading = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  color: #6a299a;
  // @media (min-width: 992px) {

  // }
`

export const RegisterWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
